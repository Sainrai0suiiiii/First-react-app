import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/login.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const storedUser = JSON.parse(localStorage.getItem('signupData'));

    if (storedUser && data.username === storedUser.email && data.password === storedUser.password) {
      localStorage.setItem('currentUser', JSON.stringify(data));
      alert('Login successful!');
      navigate('/home');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <span className="input-icon">
              {/* User icon */}
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>
            </span>
            <input type="text" placeholder="Username" {...register('username', { required: true })} />
            {errors.username && <span style={{ color: 'red', fontSize: '0.9rem' }}>Username is required</span>}
          </div>
          <div className="input-group">
            <span className="input-icon">
              {/* Lock icon */}
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="8" rx="2"/><path d="M12 15v2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            <input type="password" placeholder="Password" {...register('password', { required: true })} />
            {errors.password && <span style={{ color: 'red', fontSize: '0.9rem' }}>Password is required</span>}
          </div>
          <button type="submit" className="login-btn">LOGIN</button>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <div className="create-account">
            <Link to="/signup">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
