import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

export default function Login(){
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const {signIn} = useAuth();

  async function handleSubmit(e : React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await signIn({userName, userPassword: password});
      setIsLoading(false);
      history.push('/dashboard');
    } catch(err : any){
      setIsLoading(false);
      if(err.response.status === 500){
        alert("Usuário ou senha incorretos");
        return;
      }
      
      alert("Não foi possível realizar o login");
    }
  }

  return(
    <div className="text-center d-flex justify-content-center align-items-center" style={{ height: '80%' }}>
    <main className="form-signin" style={{width: '100%', maxWidth: 300}}>
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Login</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Senha</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
          {
             isLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : "Login"
          }
          </button>
      </form>
    </main>
  </div>
  );
}