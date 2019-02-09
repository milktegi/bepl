import React, { Component } from 'react';
import styles from './signin.css';
import FormField from '../widgets/FormFields/formfields';
import { firebase } from '../../firebase';

class SignIn extends Component {
  state = {
    registerError: '',
    loading: false,
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: '이메일 입력'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: '패스워드 입력'
        },
        validation: {
          required: true,
          password: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
   
      }
    }
  };

  updateForm = element => {
    // 기존 상태 카피
    const newFormdata = {
      ...this.state.formdata
    };
    // 유저 상태 카피
    const newElement = {
      ...newFormdata[element.id]
    };
    // 유저 상태의 value 속성에
    // 유저입력값을 저장
    newElement.value = element.event.target.value;

    if (element.blur) {
      let validData = this.validate(newElement);
      // console.log(validData);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }
    // 해당 유저에
    // 업데이트 엘리먼트를 대입
    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    // 상태 업데이트
    this.setState({
      formdata: newFormdata
    });
  };

  submitButton = () =>
    this.state.loading ? (
      'loading...'
    ) : (
      <div>
        <button onClick={event => this.submitForm(event, false)}>
          지금 회원 가입
        </button>
        <button onClick={event => this.submitForm(event, true)}>로그인</button>
      </div>
    );

  showError = () => {
    this.state.registerError !== '' ? (
      <div className={styles.error}>{this.state.registerError}</div>
    ) : (
      ''
    );
  };

  submitForm = (event, type) => {
    event.preventDefault();
    if (type !== null) {
      let dataToSubmit = {};
      let formIsValid = true;

      for (let key in this.state.formdata) {
        dataToSubmit[key] = this.state.formdata[key].value;
      }
      for (let key in this.state.formdata) {
        formIsValid = this.state.formdata[key].valid && formIsValid;
      }
      if (formIsValid) {
        // console.log(dataToSubmit)
        // 가입 아니면 로그인
        this.setState = {
          loading: true,
          registerError: ''
        };
        if (type) {
          // console.log('login')
          firebase
            .auth()
            .signInWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => {
              this.props.history('/');
            })
            .catch((err) => {
              this.setState({
                loading: false,
                registerError: err.message
              });
            });
        } else {
          // console.log('register')
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => {
              this.props.history.push('/');
            })
            .catch(err => {
              this.setState({
                loading: false,
                registerError: err.message
              });
            });
        }
      }
    }
  };

  validate = element => {
    let error = [true, ''];

    if (element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value);
      const message = ` ${!valid ? '유효한 이메일을' : ''}
			`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.password) {
      const valid = element.value.length >= 5;
      const message = ` ${!valid ? '5자 이상 입력ㄱㄱ' : ''}
			`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = ` ${!valid ? '바르게 입력해줘 ㅇㅇ' : ''}
			`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  render() {
    return (
      <div className={styles.logContainer}>
        <form onSubmit={event => this.submitForm(event, null)}>
          <h2>회원가입 / 로그인 </h2>
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={element => this.updateForm(element)}
          />

          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}

export default SignIn;
