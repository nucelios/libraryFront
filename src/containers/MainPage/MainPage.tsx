import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "../../components/preloader/preloader";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { deleteBook, getBooks } from "@/features/mainSlice/mainSlice";

function MainPage() {
  const data = useAppSelector((state) => state.library);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [bookToDeleteId, setBookToDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();
  const goToEdit = (id: number | undefined) => {
    navigate(`library/${id}`);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleDeleteConfirmationOpen = (id: number) => {
    setBookToDeleteId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setBookToDeleteId(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmed = () => {
    if (bookToDeleteId !== null) {
      dispatch(deleteBook(bookToDeleteId)).then(() => {
        dispatch(getBooks());
      });
    }
    setBookToDeleteId(null);
    setDeleteConfirmationOpen(false);
  };
  return (
    <div>
      <Typography fontSize={30}>Книги</Typography>
      {data.isLoading && <Preloader />}

      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        marginTop={10}
        paddingBottom={20}
      >
        {data.books.map((book) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              justifyContent={"center"}
              alignItems={"center"}
              key={book.id}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => {
                  goToEdit(book.id);
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Название: {book.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      Автор: {book.author}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      Год: {book.publishYear}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      Описание: {book.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActionArea
                 onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteConfirmationOpen(book.id as number);
                }}
                >
                  <Typography
                    fontSize={25}
                    color={"orange"}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Delete
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить эту книгу?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Нет
          </Button>
          <Button onClick={handleDeleteConfirmed} color="primary" autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MainPage;
