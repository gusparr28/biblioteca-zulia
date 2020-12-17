import './App.css';
import M from 'materialize-css';
import { React, useState, useEffect, useRef } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [libros, setLibros] = useState('');
  const [computadoras, setComputadoras] = useState('');
  const [id, setId] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const searchModal = useRef(null);
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState([]);

  const crearUsuario = e => {
    e.preventDefault();
    if (id) {
      fetch('/user/' + id, {
        method: 'PUT',
        body: JSON.stringify({
          nombre,
          apellido,
          cedula,
          telefono,
          direccion,
          parroquia,
          hora_entrada: horaEntrada,
          hora_salida: horaSalida,
          consulta_libros: libros,
          consulta_computadoras: computadoras,
          _id: id
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(data => {
          M.toast({ html: data.message });
          setNombre('');
          setApellido('');
          setCedula('');
          setTelefono('');
          setDireccion('');
          setParroquia('');
          setHoraEntrada('');
          setHoraSalida('');
          setLibros('');
          setComputadoras('');
          setId('');
          mostrarUsuarios();
        });
    } else {
      fetch('/user', {
        method: 'POST',
        body: JSON.stringify({
          nombre,
          apellido,
          cedula,
          telefono,
          direccion,
          parroquia,
          hora_entrada: horaEntrada,
          hora_salida: horaSalida,
          consulta_libros: libros,
          consulta_computadoras: computadoras
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(data => {
          M.toast({ html: data.message });
          setNombre('');
          setApellido('');
          setCedula('');
          setTelefono('');
          setDireccion('');
          setParroquia('');
          setHoraEntrada('');
          setHoraSalida('');
          setLibros('');
          setComputadoras('');
          mostrarUsuarios();
        })
        .catch(err => console.error(err));
    }
  };

  const mostrarUsuarios = () => {
    fetch('/user')
      .then(res => res.json())
      .then(data => {
        setUsuarios(data.users);
      });
  };

  const eliminarUsuario = (id) => {
    fetch('/user/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        M.toast({ html: data.message });
        mostrarUsuarios();
      });
  };

  const actualizarUsuario = (id) => {
    fetch('/user/' + id)
      .then(res => res.json())
      .then(data => {
        setNombre(data.user.nombre);
        setApellido(data.user.apellido);
        setCedula(data.user.cedula);
        setTelefono(data.user.telefono);
        setDireccion(data.user.direccion);
        setParroquia(data.user.parroquia);
        setHoraEntrada(data.user.hora_entrada);
        setHoraSalida(data.user.hora_salida);
        setLibros(data.user.consulta_libros);
        setComputadoras(data.user.consulta_computadoras);
        setId(data.user._id);
      });
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/searchUser", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json())
      .then(results => {
        setUserData(results.user);
      });
  };

  useEffect(() => {
    mostrarUsuarios();
  }, []);

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  return (
    <div>

      <div id="modal1" className="modal" ref={searchModal}>
        <div className="modal-content">
          <input
            type="text"
            placeholder="Buscar por cedula"
            value={search}
            onChange={e => fetchUsers(e.target.value)}
          />
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cedula</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Parroquia</th>
              <th>Hora de Entrada</th>
              <th>Hora de Salida</th>
              <th>Libros</th>
              <th>Computadoras</th>
            </tr>
          </thead>
          <tbody>
            {userData.map(usuario => {
              return (
                <tr key={usuario._id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.cedula}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.parroquia}</td>
                  <td>{usuario.hora_entrada}</td>
                  <td>{usuario.hora_salida}</td>
                  <td>{usuario.consulta_libros}</td>
                  <td>{usuario.consulta_computadoras}</td>
                </tr>
              )
            })}
          </tbody>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-red btn-flat" onClick={() => setSearch('')}>Cerrar</button>
        </div>
      </div>

      <nav className="light-blue darken-4">
        <div className="container">
          <a className="brand-logo" href="/">Biblioteca Pública del Zulia</a>
        </div>
        <i data-target="modal1" style={{ marginLeft: "1100px", cursor: "pointer" }} className="large material-icons modal-trigger">search</i>
      </nav>

      <div className="container" style={{ marginLeft: "90px" }}>
        <div className="row">
          <div className="col s5">
            <div className="card">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={crearUsuario}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Cédula" value={cedula} onChange={e => setCedula(e.target.value)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Parroquia" value={parroquia} onChange={e => setParroquia(e.target.value)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Hora de entrada" value={horaEntrada} onChange={e => setHoraEntrada(e.target.value)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Hora de salida" value={horaSalida} onChange={e => setHoraSalida(e.target.value)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Libros" value={libros} onChange={e => setLibros(e.target.value)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Computadoras" value={computadoras} onChange={e => setComputadoras(e.target.value)} />
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">Enviar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col s5">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Cedula</th>
                  <th>Telefono</th>
                  <th>Direccion</th>
                  <th>Parroquia</th>
                  <th>Hora de Entrada</th>
                  <th>Hora de Salida</th>
                  <th>Libros</th>
                  <th>Computadoras</th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map(usuario => {
                    return (
                      <tr key={usuario._id}>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.apellido}</td>
                        <td>{usuario.cedula}</td>
                        <td>{usuario.telefono}</td>
                        <td>{usuario.direccion}</td>
                        <td>{usuario.parroquia}</td>
                        <td>{usuario.hora_entrada}</td>
                        <td>{usuario.hora_salida}</td>
                        <td>{usuario.consulta_libros}</td>
                        <td>{usuario.consulta_computadoras}</td>
                        <td>
                          <button onClick={() => eliminarUsuario(usuario._id)} className="btn light-blue darken-4">
                            <i className="material-icons">delete</i>
                          </button>

                          <button style={{ marginTop: "4px" }} onClick={() => actualizarUsuario(usuario._id)} className="btn light-blue darken-4">
                            <i className="material-icons">edit</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div >
  );
}

export default App;
