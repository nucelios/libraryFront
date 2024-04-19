import FormElement from "@/components/UI/form/FormElement";
import {
  editBook,
  getBookById,
  getBooks,
} from "@/features/mainSlice/mainSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { ILibrary } from "@/interfaces/ILibrary";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { YearCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate, useParams } from "react-router-dom";
function BookEdit() {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(getBookById(id as string));
  }, [dispatch]);

  const book = useAppSelector((state) => state.library.book);

  const [state, setState] = useState<ILibrary>({
    name: "",
    author: "",
    publishYear: 0,
    description: "",
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (book) {
      setState({
        name: book?.name,
        author: book?.author,
        publishYear: book?.publishYear,
        description: book?.description,
        id: book.id
      });
    }
  }, [book, dispatch]);

  const isFormValid = () => {
    return (
      state.name !== "" &&
      state.author !== "" &&
      state.publishYear !== 0 &&
      state.description !== ""
    );
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const navigate = useNavigate();

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      setOpenModal(true);
      return;
    }
    
    dispatch(editBook(state)).then(() => {
      dispatch(getBooks());
    });
    navigate("/");
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <Box
      component={"form"}
      autoComplete="off"
      onSubmit={submitFormHandler}
      paddingY={2}
    >
      {book && (
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <FormElement
              label="Название"
              value={state.name}
              onChange={inputChangeHandler}
              name="name"
            />
          </Grid>

          <Grid item xs>
            <FormElement
              label="Автор"
              value={state.author}
              onChange={inputChangeHandler}
              name="author"
            />
          </Grid>

          <Grid item xs>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <YearCalendar
                onChange={(e) => {
                  setState((prevState) => ({
                    ...prevState,
                    publishYear: e.year(),
                  }));
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs>
            <FormElement
              label="Описание"
              value={state.description}
              onChange={inputChangeHandler}
              name="description"
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" color="primary" variant="contained">
              Принять изменения
            </Button>
          </Grid>
        </Grid>
      )}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            width: "80%",
            height: "auto",
            maxWidth: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div>Вы не заполнили все данные</div>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Ошибка
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Пожалуйста, заполните все поля формы.
          </Typography>
          <Button onClick={handleModalClose} sx={{ mt: 2 }}>
            Закрыть
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
export default BookEdit;
