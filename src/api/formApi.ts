interface CreateUserData {
  Name: string;
  Phone: string;
  Pais: string;
  Email: string;
  Termsandconditions: boolean;
  Ticket: string;
  MotivoCompra: string;
}

export const createUser = async (data: CreateUserData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/form`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al registrar visita');
  }

  return await res.json();
};


export const getUserByTelefono = async (Phone: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/form?Phone=${encodeURIComponent(Phone)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al buscar el usuario');
  }

  return await res.json();
};
