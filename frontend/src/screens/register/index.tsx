import React, { useEffect } from 'react'
import { Button, Col, Form, Input, Layout, Menu, Row, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { type Rule } from 'antd/lib/form'
import { styleLayout, styleLayoutContent, styleLayoutHeader } from './styles'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  actionAccountSetRegisterError,
  actionAccountSetRegisterFinish,
  registerUserThunk,
  selectAccount,
} from '../../store/accounts'

type FormValues = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterScreen = () => {
  const [form] = Form.useForm<FormValues>()

  const [messageApi, contextHolder] = message.useMessage()

  const navigation = useNavigate()

  const dispatch = useAppDispatch()

  const { register } = useAppSelector(selectAccount)

  useEffect(() => {
    if (register.error) {
      void messageApi.error(register.error, 15, () => {
        dispatch(actionAccountSetRegisterFinish(false))
        dispatch(actionAccountSetRegisterError(null))
      })
    }

    if (register.finish && register.error === null) {
      dispatch(actionAccountSetRegisterFinish(false))
      navigation('/login?sigup=ok')
    }
  }, [register, messageApi, dispatch, navigation])

  const finishRegister = (values: FormValues) => {
    dispatch(
      registerUserThunk({
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        password: values.password,
        role: 'user',
        username: values.username,
      })
    )
  }

  const validatePassword = (
    rule: Rule,
    value: string,
    callback: (error?: string) => void
  ) => {
    if (!value) {
      callback('Especifique una contraseña')
    } else if (value.length < 8) {
      callback('La contraseña debe tener al menos 8 caracteres')
    } else {
      callback()
    }
  }

  const confirmPasswordValidator = (
    _: Rule,
    value: string,
    callback: (error?: string) => void
  ) => {
    if (
      form.getFieldsValue().password !== value ||
      value === undefined ||
      form.getFieldsValue().password === undefined
    ) {
      callback('Las contraseñas no coinciden')
    }

    callback()
  }

  return (
    <>
      {contextHolder}
      <Layout className="layout" style={styleLayout}>
        <Layout.Header style={styleLayoutHeader}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={[
              {
                key: '1',
                label: 'Iniciar sesion',
                onClick() {
                  navigation('/login')
                },
              },
              {
                key: '2',
                label: 'Registrarse',
              },
            ]}
          />
        </Layout.Header>
        <Layout.Content style={styleLayoutContent}>
          <Row justify="center" align="middle" gutter={2}>
            <Col xs={24} lg={6}>
              <Form
                form={form}
                name="register"
                layout="vertical"
                initialValues={{}}
                onFinish={finishRegister}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: 'Especifique un nombre de usuario',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Nombre"
                  name="firstName"
                  required={true}
                  rules={[{ required: true, message: 'Cual es tu nombre' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Apellido"
                  name="lastName"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: 'Indicanos por favor tu apellido',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Correo electronico"
                  name="email"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa un correo electronico valido',
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    },
                  ]}
                >
                  <Input type="email" />
                </Form.Item>

                <Form.Item
                  label="Contraseña"
                  name="password"
                  required={true}
                  rules={[
                    {
                      required: true,
                      validator: validatePassword,
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirma tu contraseña"
                  name="confirmPassword"
                  required={true}
                  rules={[
                    {
                      required: true,
                      validator: confirmPasswordValidator,
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={register.loading}
                    disabled={register.loading}
                  >
                    Registrarme
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </>
  )
}
