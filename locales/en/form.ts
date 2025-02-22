export default {
    validation: {
      required: "Required",
      too_long: "Max char limit of {charLimit} reached",
      email: {
        required: "Email is required",
        valid: "Email must be valid.",
      },
      password: {
        hint: "Please enter your password",
        required: "Password is required",
        length: "Password must be atleast {minLength} characters",
        match: "Password must be the same",
        no_match: "Password must be different from old password",
        format:
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character from the following list ($!%*?)",
      }
    },
    error: {
      login_failed: "Unable to sign in.",
      competition_not_joined: "Sorry, your bet could not be accepted.",
      score_not_submitted: "Sorry, Your submission could't succeed."
    },
    confirmation: {
      competition_joined: "Your participation has been confirmed!",
      score_submitted: "Your score bet has been submitted."
    }
  };