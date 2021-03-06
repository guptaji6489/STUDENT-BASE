import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory} from "react-router-dom";
import Avatar from "../layout/Avatar";
import { useFirestore } from "react-redux-firebase";
import img from '../../assets/22.jpg';
const Student = () => {
  let history = useHistory();

  const firestore = useFirestore();
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  const loadStudent = async () => {
    try {
      const docRef = firestore.collection("students").doc(id);
      const result = await docRef.get();
      if (result.exists) {
        setStudent(result.data());
      } else {
        console.log("No Such Students!");
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    loadStudent();
  }, []);

  if (!student) {
    return <h1>Loading...</h1>;
  }

  const deleteStudent = ( standard) => {
    let pass = parseInt(prompt("Enter password"));
    if (pass === parseInt(standard)) {
      console.log(pass);
      return;
    } else {
    alert(" Wrong Password")
    history.goBack();
    }
  };
  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="card card-body shadow">
              <div className="row">
                <div className="col-md-4">
                  <Avatar url={img} />
                </div>
                <div className="col-md-8">
                  <ul className="list-group">
                    <li className="d-flex justify-content-between align-items-center list-group-item list-group-item-action">
                      <h3 className="m-0">{student.name}</h3>
                      <Link className="btn btn-primary" onClick={()=>deleteStudent(student.standard)} to={`/studentForm/${id}`}>
                        Edit
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <p>
                        <b>Email:</b> {student.email}
                      </p>
                      {/* <p><b>Password:</b> {student.standard}</p> */}
                      <p>
                        <b>Whatsapp/Calling No:</b> {student.phone}
                      </p>
                      <p>
                        <b>Address :</b> {student.address1}
                      </p>
                      <p>
                        <b>Technical Language Known:</b> {student.address2}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
