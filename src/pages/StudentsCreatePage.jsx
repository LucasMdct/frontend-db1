import { Button, Col, Form, Modal, notification, Row, Space, Select} from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import InputText from '../components/InputText';
import InputSelect from '../components/InputSelect';
import { validateTaskTitle } from '../holdouts/assessments';

function StudentsCreatePage() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((event) => {
    const { name, input } = event;

    setFormValues({
      ...formValues,
      [name]: input,
    });
  }, [formValues]);

  const requestStudent = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`https://gym.medeirosdev.cloud/students/`);

      const { data } = response;

      setFormValues({
        name: {
          value: data.name,
          valid: true,
        },
        gender: {
          value: data.gender,
          valid: true,
        },
        age: {
          value: data.age, // Converte para string, se necessário
          valid: true,
        },
        height: {
          value: data.height, // Converte para string, se necessário
          valid: true,
        },
        weight: {
          value: data.weight, // Converte para string, se necessário
          valid: true,
        },
      });
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível carregar a tarefa, tente novamente mais tarde.',
      });
      navigate('/students');
    } finally {
      setLoading(false);
    }
  }, [studentId, navigate]);
  
  useEffect(() => {
    if (studentId) {
      requestStudent();
    } else {
      setFormValues({});
    }
  }, [requestStudent, studentId]);

  const handleCreateStudent = useCallback(async () => {
    try {
      setLoading(true);

      const { name, gender, age, height, weight } = formValues;

      if (!name?.valid || !gender?.valid || !age?.valid || !height?.valid || !weight?.valid) return; // Ajuste do operador lógico

      const body = {
        name: name.value,
        gender: gender.value,
        age: parseInt(age.value), // Converte de volta para número, se necessário
        height: parseFloat(height.value), // Converte de volta para número, se necessário
        weight: parseFloat(weight.value), // Converte de volta para número, se necessário
      };

      if (studentId) {
        await axios.patch(`https://gym.medeirosdev.cloud/students/${studentId}`, body);
      } else {
        await axios.post('https://gym.medeirosdev.cloud/students', body);
      }

      notification.success({
        message: 'Estudante salvo com sucesso!',
      });

      navigate('/students');
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi cadastrar-se, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [formValues, navigate, studentId]);

  return (
    <Content>
      <br />
      <Space direction="vertical" style={{ display: 'flex' }}>

        <Row justify="center">
          <Col xs={23} sl={14} md={12} lg={10} xl={8}>

            <Form layout="vertical">
              <InputText
                name="name"
                label="Nome do Seu Aluno"
                size="large"
                onChange={handleInputChange}
                validate={validateTaskTitle}
                disabled={loading}
                required
                value={formValues.name?.value}
              />

              <InputSelect
                name="gender"
                label="Seu Gênero"
                defaultValue="Gênero"
                required
                onChange={handleInputChange}
                options={[
                  { value: 'F', label: 'Feminino'},
                  { value: 'M', label: 'Masculino'},
                ]}
                style={{ width: '100%', paddingBottom: '15px' }}
                alue={formValues.gender?.value}
              />

              <InputText
                name="age"
                label="Idade do Seu Aluno"
                size="large"
                onChange={handleInputChange}
                validate={validateTaskTitle}
                disabled={loading}
                required
                value={formValues.age?.value}
              />

              <InputText
                name="weight"
                label="Peso (82.00)"
                size="large"
                onChange={handleInputChange}
                validate={validateTaskTitle}
                disabled={loading}
                required
                value={formValues.weight?.value}
              />

              <InputText
                name="height"
                label="Altura (1.70)"
                size="large"
                onChange={handleInputChange}
                validate={validateTaskTitle}
                disabled={loading}
                required
                value={formValues.height?.value}
              />

              <Button
                block
                type="primary"
                size="large"
                onClick={handleCreateStudent}
                loading={loading}
              >
                Salvar
              </Button>
            </Form>

          </Col>
        </Row>
      </Space>
    </Content>
  );
}

export default StudentsCreatePage;
