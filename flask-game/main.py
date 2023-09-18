from flask import Flask, render_template, request, session, redirect, url_for
from flask_socketio import join_room, leave_room, send, SocketIO
import random
from string import ascii_uppercase

app = Flask(__name__)
app.config["SECRET_KEY"] = "khklsdhfajksdf"
socketio = SocketIO(app)


rooms = {}


def generate_unique_code(length):
    while True:
        code = ""
        for _ in range(length):
            code += random.choice(ascii_uppercase)
        if code not in rooms:
            break
    return code


@app.route("/", methods=["GET", "POST"])
def home():
    session.clear()
    if request.method == "POST":
        name = request.form.get("name")
        code = request.form.get("code")
        join = request.form.get("join", False)
        create = request.form.get("create", False)

        if not name:
            return render_template(
                "home.html", error="Please enter a name.", code=code, name=name
            )

        if join and not code:
            return render_template(
                "home.html", error="Please enter a room code.", code=code, name=name
            )

        room = code
        if create != False:
            room = generate_unique_code(4)
            rooms[room] = {"users": {}, "messages": []}
        elif code not in rooms:
            return render_template(
                "home.html", error="Room does not exist.", code=code, name=name
            )

        session["room"] = room
        session["name"] = name
        return redirect(url_for("game"))

    return render_template("home.html")


@app.route("/game")
def game():
    room = session.get("room")
    name = session.get("name")
    if room == None or name == None or room not in rooms:
        return redirect(url_for("home"))
    if len(rooms[room]["users"]) == 2 and name not in rooms[room]["users"]:
        return redirect(url_for("home"))
    return render_template(
        "tic-tac-toe.html", code=room, name=name, messages=rooms[room]["messages"]
    )


@socketio.on("connect")
def connect(auth):
    print("connected")
    room = session.get("room")
    name = session.get("name")
    if not room or not name:
        return
    if room not in rooms:
        leave_room(room)
        return
    join_room(room)

    if len(rooms[room]["users"]) == 2:
        return
    if not rooms[room]["users"]:
        rooms[room]["users"] = {name: "X"}
        socketio.emit(
            "init_game",
            {"room": rooms[room], "startCoord": None},
            to=room,
        )
    elif len(rooms[room]["users"]) == 1:
        rooms[room]["users"][name] = "O"
        socketio.emit(
            "init_game",
            {
                "room": rooms[room],
                "startCoord": rooms[room]["startCoord"],
            },
            to=room,
        )

    print(f"{name} joined room {room}")


@socketio.on("disconnect")
def disconnect():
    room = session.get("room")
    name = session.get("name")
    leave_room(room)

    send({"name": name, "message": "has left the room"}, to=room)
    print(f"{name} has left the room {room}")


@socketio.on("start_coord")
def startingCoord(data):
    room = session.get("room")
    print(data)
    rooms[room]["startCoord"] = data


@socketio.on("gameMove")
def gameMove(board_id, cell_id):
    room = session.get("room")
    user = session.get("name")
    socketio.emit(
        "update_board",
        {"lastPlayerToMove": user, "boardId": board_id, "cellCoord": cell_id},
        to=room,
    )
    print(board_id, cell_id)


@socketio.on("message")
def message(data):
    room = session.get("room")
    if room not in rooms:
        return
    content = {"name": session.get("name"), "message": data["data"]}
    send(content, to=room)
    rooms[room]["messages"].append(content)
    print(f"{session.get('name')}, said: {data['data']}")


if __name__ == "__main__":
    socketio.run(app, debug=True)
