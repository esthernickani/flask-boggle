from flask import Flask, redirect, request, render_template, session, flash, jsonify
from boggle import Boggle
import pdb

app = Flask(__name__, template_folder = "templates")
app.config['SECRET_KEY'] = "oh-so-secret"

boggle_game = Boggle()

@app.route('/')
def display_board():
    """Display board from boggle"""
    boggle_board = boggle_game.make_board()
    session['board'] = boggle_board
    scores = session.get('scores', [])
    games_played = session.get('games_played', 0)
    return render_template("base.html", boggle_board=boggle_board)

@app.route('/submit_guess', methods=["POST"])
def submit_guess():
    boggle_board = session['board']
    word_from_user = request.form.get('guess_word')
    response_data = boggle_game.check_valid_word(boggle_board, word_from_user)
    return jsonify(response_data)
    
@app.route('/submit_results', methods=["POST"])
def submit_results():
    
    scores = session.get('scores', [])
    current_score = request.json['finalScore']
    scores.append(current_score)
    session['scores'] = scores

    games_played = session.get('games_played', 0)
    games_played += 1
    session['games_played'] = games_played

    
    pdb.set_trace()
    return jsonify(current_score)

if __name__ == "__main__":
    app.run()