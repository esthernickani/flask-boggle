const guessedWordArr = [];
$(document).ready(function() {
    $("#submit_guess_form").on('submit', handleGuess)
    $(".submit").prop('disabled', true)
    $("#guess_word").prop('disabled', true)
    $('.start_game').show()

    $(".start_game").on("click", function() {
        //enable game 
        $(".submit").prop('disabled', false)
        $("#guess_word").prop('disabled', false)
        $('.start_game').hide()

        setTimeout(async function() {
            $(".submit").prop('disabled', true)
            $("#guess_word").prop('disabled', true)

            const finalScore = parseInt($('.current_num').text())
            const res = await axios.post("/submit_results", {finalScore: finalScore})
        }, 60000)
    })
})

 async function handleGuess(e) {
    
    e.preventDefault();
    const formData = $(this).serialize();
    let guessedWord = $("#guess_word").val();

    try {
        const response = await axios.post("/submit_guess", formData)
        if (response.data === "not-word") {
            $('.result').text(`${guessedWord} is not a word`)
        } else if (response.data === "not-on-board") {
            $('.result').text(`${guessedWord} is not on the board`)
        } else if (response.data === "ok") {
            if (!guessedWordArr.includes(guessedWord)){ 
                $('.result').text(`${guessedWord} is ok`)
                guessedWordArr.push(guessedWord)
                const currentScore = parseInt($('.current_num').text())
                const scoreToAdd = guessedWord.length;
                const newScore = currentScore+scoreToAdd;
                $('.current_num').text(`${newScore}`)
            } else {
                $('.result').text(`${guessedWord} has been guessed previously`)
            }
        }
    } catch(e) {
        console.log(e)
    }
    //reset the input field
    $("#guess_word").val('');

    
}

 