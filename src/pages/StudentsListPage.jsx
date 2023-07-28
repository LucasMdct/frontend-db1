import { useEffect, useState } from 'react';
import {
  Layout, Row, Col, Table, Modal, Button, Space, Popconfirm,
} from 'antd';
import axios from 'axios';
import {
  BorderOutlined, CheckOutlined, DeleteOutlined, FormOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Column } = Table;

function StudentsListPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);


  const requestStudents = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`https://gym.medeirosdev.cloud/students`);

      const { data } = response;

      setStudents(data);

    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível carregar seus alunos, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    requestStudents() // Chame a função passando o ID do professor
  }, []);

  const removeStudent = async (student) => {
    try {
      setLoading(true);

      await axios.delete(`https://gym.medeirosdev.cloud/students/${student.id}`);

      const newStudents = [...students];
      const index = newStudents.findIndex((student) => student.id === student.id);

      newStudents.splice(index, 1);

      setStudents(newStudents);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível processar, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };


  const renderActions = (student,studentId) => (
    <Button.Group>
          <Button
        onClick={() => {
          navigate(`/students/${student.id}`);
        }}
        icon={<FormOutlined />}
      />
      <Popconfirm
        title="Deseja excluir o Aluno?"
        okText="Sim, excluir"
        cancelText="Não, cancelar"
        onConfirm={() => {
          removeStudent(studentId);
        }}>
        <Button
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
    </Button.Group>
  );

  return (
    <Content>
      <br />
      <Space direction="vertical" style={{ display: 'flex' }}>

        <Row justify="center">
          <Col span={23}>

            <Table
              dataSource={students}
              pagination
              loading={loading}
              rowKey={(student) => student.id}
            >
              <Column
                title="ID"
                dataIndex="id"
                key="id"
              />
              <Column
                title="Nome"
                dataIndex="name"
                key="name"
              />
              <Column
                title="Peso"
                dataIndex="weight"
                key="weight"
              />
              <Column
                title="Altura"
                dataIndex="height"
                key="height"
              />
              <Column
                title="IMC"
                dataIndex="imc"
                key="imc"
              />
              <Column
                title="Classe IMC"
                dataIndex="rank_imc"
                key="rank_imc"
              />
              <Column
                title="Criada em"
                dataIndex="createdAt"
                key="createdAt"
                render={(data) =>
                  new Date(data).toLocaleString('pt-BR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }
              />
              <Column
                title="Atualizada em"
                dataIndex="updatedAt"
                key="updatedAt"
                render={(data) =>
                  new Date(data).toLocaleString('pt-BR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }
              />
              <Column
                title="Ações"
                key="acoes"
                render={renderActions}
              />
            </Table>
          </Col>
        </Row>
      </Space>
    </Content>
  );
}

export default StudentsListPage;
