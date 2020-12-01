<template>
  <div id="questionnaire">
    <div id="title">
      <pre>
      Thanks for your participation in this study.
      To finish up, we have a few questions:</pre
      >
    </div>
    <div id="questionnaireForm">
      <form @submit.prevent="submitOrder">
        <span class="label">What is your age in years?</span>
        <div>
          <input
            type="text"
            size="20"
            id="age"
            name="age"
            v-model.lazy="$v.age.$model"
          />
        </div>
        <template v-if="$v.age.$error">
          <span class="error" v-if="!$v.age.required">* Required</span>
        </template>

        <span class="label">What is your age in gender?</span>
        <div>
          <input
            type="text"
            size="20"
            id="gender"
            name="gender"
            v-model.lazy="$v.gender.$model"
          />
        </div>
        <template v-if="$v.gender.$error">
          <span class="error" v-if="!$v.gender.required">* Required</span>
        </template>

        <span class="label">What is your level of education?</span>
        <div>
          <input
            type="text"
            size="100"
            id="education"
            name="education"
            v-model.lazy="$v.education.$model"
          />
        </div>
        <template v-if="$v.education.$error">
          <span class="error" v-if="!$v.education.required">* Required</span>
        </template>

        <span class="label">What is your strategy?</span>
        <div>
          <input
            type="text"
            size="100"
            id="strategy"
            name="strategy"
            v-model.lazy="$v.strategy.$model"
          />
        </div>
        <template v-if="$v.strategy.$error">
          <span class="error" v-if="!$v.strategy.required">* Required</span>
        </template>

        <span class="label">How well do you think you did?</span>
        <div>
          <input
            type="text"
            size="100"
            id="selfEvaluation"
            name="selfEvaluation"
            v-model.lazy="$v.selfEvaluation.$model"
          />
        </div>
        <template v-if="$v.selfEvaluation.$error">
          <span class="error" v-if="!$v.selfEvaluation.required"
            >* Required</span
          >
        </template>

        <span class="label">Was anything confusing about this game?</span>
        <div>
          <input
            type="text"
            size="100"
            id="confusing"
            name="confusing"
            v-model.lazy="$v.confusing.$model"
          />
        </div>
        <template v-if="$v.confusing.$error">
          <span class="error" v-if="!$v.confusing.required">* Required</span>
        </template>

        <span class="label"
          >Do you have any other comments about this game?</span
        >
        <div>
          <input
            type="text"
            size="100"
            id="comments"
            name="comments"
            v-model.lazy="$v.comments.$model"
          />
        </div>
        <template v-if="$v.comments.$error">
          <span class="error" v-if="!$v.comments.required">* Required</span>
        </template>

        <router-link :to="{ name: 'conclude' }"
          ><input
            type="submit"
            name="submit"
            id="submmitButton"
            value="Complete Questionnaire"
        /></router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "Questionnaire",
  data() {
    return {
      age: "",
      gender: "",
      education: "",
      strategy: "",
      selfEvaluation: "",
      confusing: "",
      comments: ""
    };
  },
  validations: {
    age: {
      required
    },
    gender: {
      required
    },
    education: {
      required
    },
    strategy: {
      required
    },
    selfEvaluation: {
      required
    },
    confusing: {
      required
    },
    comments: {
      required
    }
  },
  methods: {
    submitOrder() {
      console.log("Submit order");
      this.$v.$touch(); // Ensures validators always run
      if (this.$v.$invalid) {
        this.checkoutStatus = "ERROR";
      } else {
        this.checkoutStatus = "PENDING";
        setTimeout(() => {
          this.checkoutStatus = "OK";
          setTimeout(() => {
            this.$router.push({ name: "conclude" });
          }, 1000);
        }, 1000);
      }
    }
  }
};
</script>

<style scoped>
#questionnaire {
  display: flex;
  flex-direction: column;
  text-align: left;
}

#title {
  font-size: 40px;
  font-weight: bold;
}

#questionnaireForm {
  width: 800px;
  padding: 20px 30px 30px 95px;
}

form {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: bold;
  font-size: 20px;
  padding-top: 25px;
}

form > div {
  padding-top: 10px;
}

form > div > input {
  height: 50px !important;
  font-size: 20px !important;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  border-radius: 4px;
  outline: none;
}

form > div > input:focus {
  outline: none;
  border: 2px solid #555;
}

input[type="submit"] {
  width: 100%;
  font-size: 20px;
  color: #1a1a1a;
  padding: 14px 20px;
  text-decoration: none;
  display: inline-block;
  background-color: #cccccc;
  border: none;
  margin: 25px 20px 30px 0px;
  outline: none;
}

input[type="submit"]:hover {
  background-color: #999999;
}

.error {
  color: red;
  font-size: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
