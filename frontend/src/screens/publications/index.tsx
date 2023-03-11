import React, { useCallback, useEffect, useState, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  actionPublicationsSetPage,
  deletePublicationThunk,
  getPublicationsThunk,
  selectPublications,
} from '../../store/publications'
import {
  Avatar,
  Card,
  Col,
  Badge,
  Layout,
  Row,
  Space,
  Pagination,
  Button,
  Modal,
  Skeleton,
} from 'antd'
import {
  UserOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CommentOutlined,
} from '@ant-design/icons'
import { EditPost } from './components'
import moment from 'moment'
import { UpdateModal } from './components/updateModal'
import { useNavigate } from 'react-router-dom'

export const PublicationsScreen = () => {
  const { loading, publications, page, totalPublications } =
    useAppSelector(selectPublications)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [post, setPost] = useState<
    { id: string; content: string; user_id: string } | undefined
  >(undefined)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const getData = useCallback(
    (page: number) => dispatch(getPublicationsThunk(page)),
    [dispatch]
  )

  useEffect(() => {
    getData(page)
  }, [getData, page])

  return (
    <>
      <Modal
        open={openDelete}
        title="Desea eliminar la publicacion"
        cancelText="Cancelar"
        okText="Eliminar"
        onOk={() => {
          if (post) {
            dispatch(deletePublicationThunk(post.id))
            setOpenDelete(false)
            setPost(undefined)
          }
        }}
        onCancel={() => {
          setOpenDelete(false)
          setPost(undefined)
        }}
      >
        {post ? post.content : ''}
      </Modal>

      <UpdateModal
        open={openUpdate}
        publication={post}
        onSave={() => {
          getData(page)
          setPost(undefined)
          setOpenUpdate(false)
        }}
      />

      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Header style={{ background: '#fff' }}>
          <h1>Publications</h1>
        </Layout.Header>
        <Layout.Content style={{ padding: '20px 50px' }}>
          <Row justify="center" align="middle" gutter={2}>
            <Col xs={24} lg={12}>
              <Space direction="vertical" size={24} style={{ width: '100%' }}>
                <EditPost onSave={() => getData(page)} />
                {loading && (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </>
                )}
                {!loading && (
                  <>
                    {publications.map((publication, index) => {
                      return (
                        <Fragment key={index}>
                          <div style={{ marginBottom: -20 }}>
                            {publication.updatedAt !== publication.createdAt ? (
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
                          <Card
                            title={
                              <>
                                <Avatar icon={<UserOutlined />} size={24} />{' '}
                                {publication.username}
                              </>
                            }
                            extra={
                              <>
                                <Badge
                                  offset={[-10, 10]}
                                  count={publication.countComments}
                                >
                                  <Button
                                    type="text"
                                    icon={<CommentOutlined />}
                                    onClick={() =>
                                      navigate(`/publication/${publication.id}`)
                                    }
                                  >
                                    Comentarios
                                  </Button>
                                </Badge>
                                <Button
                                  type="text"
                                  icon={<EditOutlined />}
                                  onClick={() => {
                                    setPost({
                                      id: publication.id,
                                      content: publication.content,
                                      user_id: publication.userId,
                                    })
                                    setOpenUpdate(true)
                                  }}
                                >
                                  Actualizar
                                </Button>
                                <Button
                                  type="text"
                                  icon={<DeleteOutlined />}
                                  onClick={() => {
                                    setPost({
                                      id: publication.id,
                                      content: publication.content,
                                      user_id: publication.userId,
                                    })
                                    setOpenDelete(true)
                                  }}
                                >
                                  Eliminar
                                </Button>
                              </>
                            }
                          >
                            {publication.content}
                          </Card>
                        </Fragment>
                      )
                    })}
                    <Pagination
                      onChange={(page) => {
                        dispatch(actionPublicationsSetPage(page))
                      }}
                      hideOnSinglePage={true}
                      showSizeChanger={false}
                      defaultCurrent={page}
                      total={totalPublications}
                      defaultPageSize={25}
                    />
                  </>
                )}
              </Space>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </>
  )
}
