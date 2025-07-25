import { Routes, Route, Navigate } from 'react-router-dom';
import FormPage from '../pages/formpage/FormPage';
import FormLayout from '../layout/FormLayout';
import FormImagenPage from '../pages/formimagenpage/FormImagenPage';

export default function AppRoutes (){

  return (
    <Routes>
      <Route path="/" element={<FormLayout />}>
        <Route index element={<FormPage />} /> 
        <Route path="cargaimagen" element={<FormImagenPage />} />
      </Route>

      {/* Redirección */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
