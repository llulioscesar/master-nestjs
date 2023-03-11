import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  getPublicationByIdThunk,
  selectPublications,
} from '../../store/publications'
import { Avatar, Card, Col, Divider, Layout, Row, Skeleton, Space } from 'antd'
import {
  ClockCircleOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons'
import moment from 'moment/moment'
import { Comments, EditComment } from './components'
import { selectAccount } from '../../store/accounts'

export const PublicationScren = () => {
  const params = useParams()

  const { publication, error, loading } = useAppSelector(selectPublications)
  const { user } = useAppSelector(selectAccount)
  const dispatch = useAppDispatch()

  const getData = useCallback(() => {
    if (params.id) {
      dispatch(getPublicationByIdThunk(params.id))
    }
  }, [dispatch, params.id])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Content style={{ padding: '20px 50px' }}>
          <Row justify="center" align="middle" gutter={2}>
            <Col xs={24} lg={12}>
              {loading && <Skeleton />}
              {!loading && (
                <>
                  {publication !== null && (
                    <>
                      <Space
                        direction="vertical"
                        size={24}
                        style={{ width: '100%' }}
                      >
                        <Card
                          title={
                            <>
                              <Avatar icon={<UserOutlined />} size={24} />{' '}
                              {publication.username}
                            </>
                          }
                          extra={
                            <div>
                              {publication.updatedAt !==
                              publication.createdAt ? (
                                <EditOutlined />
                              ) : (
                                <ClockCircleOutlined />
                              )}{' '}
                              {moment(
                                publication.createdAt !== publication.updatedAt
                                  ? publication.updatedAt
                                  : publication.createdAt
                              ).fromNow()}
                            </div>
                          }
                        >
                          {publication.content}
                        </Card>
                        <EditComment
                          publicationId={publication.id}
                          userId={user ? user.id : ''}
                        />
                      </Space>
                      <Divider>Comentarios</Divider>
                      <Comments
                        publicationId={publication.id}
                        userId={user ? user.id : ''}
                      />
                    </>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </>
  )
}
