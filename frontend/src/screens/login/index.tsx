import React, { useEffect } from 'react'
import { Button, Col, Form, Input, Layout, Menu, message, Row } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { styleLayout, styleLayoutContent, styleLayoutHeader } from './style'
import { type Rule } from 'antd/lib/form'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  actionAccountSetError,
  loginThunk,
  selectAccount,
} from '../../store/accounts'

type FormValues = {
  email: string
  password: string
}

export const LoginScreen = () => {
  const [form] = Form.useForm<FormValues>()

  const location = useLocation()

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { error, loading, token } = useAppSelector(selectAccount)

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const signup = searchParams.get('signup')
    if (signup) {
      messageApi.success('Registro exitoso', 30)
    }
  }, [location.search, messageApi])

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

  const onFinish = async (values: FormValues) => {
    await dispatch(
      loginThunk({
        email: values.email,
        password: values.password,
      })
    )
  }

  useEffect(() => {
    if (error) {
      void messageApi.error(error, 15, () => {
        dispatch(actionAccountSetError(null))
      })
    }

    if (token) {
      navigate('/')
    }
  }, [dispatch, error, messageApi, navigate, token])

  return (
    <>
      {contextHolder}
      <Layout style={styleLayout}>
        <Layout.Header style={styleLayoutHeader}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                label: 'Iniciar sesion',
              },
              {
                key: '2',
                label: 'Registrarse',
                onClick() {
                  navigate('/register')
                },
              },
            ]}
          />
        </Layout.Header>
        <Layout.Content style={styleLayoutContent}>
          <Row justify="center" align="middle" gutter={2}>
            <Col xs={24} lg={6}>
              <Form
                form={form}
                name="login"
                layout="vertical"
                onFinish={onFinish}
              >
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

                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                    disabled={loading}
                  >
                    Iniciar sesion
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
