export default {
    action: {
        join_now: "Join Now",
        leaderboard: "Open Leaderboard",
        rank_message: "You are in {rank} place.",
        submit_score: "Submit Score"
    },
    leader: "{name} is leading with {score} score",
    no_scores_yet: "No scores submitted yet.",
    join: {
        form: {
            editor_title: "Join Competition",
            description: "Please fill the form below to join a competition so that you can start participating by submitting your scores.",
            fields: {
                entry_fee: "Entry Fee",
                entry_fee_placeholder: "How much are you willing to bet?",
                min_entry_rule: "Minimum amount for entry is {amount}",
                max_entry_rule: "Maximum amount for entry is {amount}",
              },
        }
    },
    score: {
        form: {
            editor_title: "Place Your Bet",
            description: "Enter your wager to compete in this event. Your bet is tied to your score submission.",
            fields: {
                score_input: "Bet Amount",
                score_placeholder: "How much are you willing to wager on your score?"
            }
        }
    },
    leaderboard: {
        dialog_title: "Competition Detail",
        title: "Leaderboard",
        score_type: "{type} Wins",
        tiebreaker_rule: "{rule} breaks the tie",
        headers: {
            rank: "Rank",
            player_id: "Player ID",
            player_name: "Player Name",
            highest_score: "Highest Score",
            total_entries: "Total Entries"
        }
    },

    dates: {
        start: "Start Date",
        end: "End Date",
        no_end: "No end date"
      }
    
}