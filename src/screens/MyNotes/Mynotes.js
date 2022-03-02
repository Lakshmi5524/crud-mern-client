import React, { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import MainScreen from "../../components/MainScreen/MainScreen"
import { Accordion, Badge, Button, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { listNotes } from "../../actions/notesActions"
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import { deleteNoteAction } from "../../actions/notesActions"

const Mynotes = ({ search }) => {
  const dispatch = useDispatch()

  const noteList = useSelector((state) => state.noteList)
  const { loading, notes, error } = noteList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const noteCreate = useSelector((state) => state.noteCreate)
  const { success: successCreate } = noteCreate

  const noteUpdate = useSelector((state) => state.noteUpdate)
  const { success: successUpdate } = noteUpdate

  const noteDelete = useSelector((state) => state.noteDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id))
    }
  }

  //console.log(notes)

  const history = useHistory()

  useEffect(() => {
    dispatch(listNotes())
    if (!userInfo) {
      history.push("/")
    }
  }, [dispatch, successCreate, history, userInfo, successUpdate, successDelete])
  return (
    <MainScreen title={`Welcome Back ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes
        ?.filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .reverse()
        .map((note) => (
          <Accordion key={note._id}>
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  {note.title}
                </span>
                <div>
                  {/*<Link to={`/note/${note._id}`}>Edit</Link>*/}
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>

              <Card.Body>
                <h4>
                  <Badge variant="success">Category-{note.category}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    Created on{""}
                    <cite title="Source Title">
                      {note.createdAt.substring(0, 10)}
                    </cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  )
}

export default Mynotes
