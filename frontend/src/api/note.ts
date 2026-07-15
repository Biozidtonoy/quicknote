import api from "./axios";
import { getToken } from "../services/authStorage";

type CreateNoteRequest = {
  title: string;
  content: string;
};

type UpdateNoteRequest = {
  title: string;
  content: string;
};

export type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export async function createNote(
  note: CreateNoteRequest
) {
  const token = getToken();

  const response = await api.post(
    "/notes",
    note,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function getNotes() {
  const token = getToken();

  const response = await api.get(
    "/notes",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function updateNote(
  noteId: number,
  note: UpdateNoteRequest
) {
  const token = getToken();

  const response = await api.put(
    `/notes/${noteId}`,
    note,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function deleteNote(
  noteId: number
) {
  const token = getToken();

  const response = await api.delete(
    `/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}