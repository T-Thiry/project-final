const Signup = () => {
  return ( 
    <div className='signup-container'>
      <h1>Create Your Account</h1>
      <form>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            placeholder='Name'
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            placeholder='Email'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            placeholder='Password'
          />
          </div>
          <button type='submit'>Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};


export default Signup;
