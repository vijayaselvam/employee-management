import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function Read() {

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://localhost:7022/api/Employee/GetAllEmployees`)
      .then((response) => {
        setAPIData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getData = () => {
    axios
      .get(`https://localhost:7022/api/Employee/GetAllEmployees`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  const setData = (data) => {
    console.log(data);
    //assigning values to variable
    let {
      employeeId,
      employeeFirstName,
      employeeLastName,
      designation,
      salary,
    } = data;


    localStorage.setItem("ID", employeeId);
    localStorage.setItem("First Name", employeeFirstName);
    localStorage.setItem("Last Name", employeeLastName);
    localStorage.setItem("Designation", designation);
    localStorage.setItem("Salary", salary);
  };

  const onDelete = (employeeId) => {
    axios
      .delete(
        `https://localhost:7022/api/Employee/DeleteEmployee?id=${employeeId}`
      )
      .then(() => {
        getData();
      });
  };
  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Designation</Table.HeaderCell>
            <Table.HeaderCell>Salary</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.employeeFirstName}</Table.Cell>
                <Table.Cell>{data.employeeLastName}</Table.Cell>
                <Table.Cell>{data.designation}</Table.Cell>
                <Table.Cell>{data.salary}</Table.Cell>

                <Link to="/update">
                  <Table.Cell>
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.employeeId)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
