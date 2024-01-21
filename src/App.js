import { Routes, Route } from 'react-router-dom';
import PetListing from './components/PetListing';
import PetProfile from './components/PetProfile';

import Home from './components/Home';
import UserProfile from './components/UserProfile';

import Login from './components/Login';
import Communication from './components/Communication';
import AdoptionForm from './components/AdoptionForm';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Etlist from './components/petlist';

import Register from './components/Register';
function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* <Route path="linkpage" element={<LinkPage />} />
      <Route path="unauthorized" element={<Unauthorized />} /> */}

      <Route path="/:id" element={<PetProfile />} />
      <Route path="adoption-form" element={<AdoptionForm />} />
      <Route path="communication" element={<Communication />} />
      <Route path="user-profile/:id" element={<UserProfile />} />
      {/* we want to protect these routes */}

      {/* <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>
      </Route> */}

      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Route>
  </Routes>
  );
}

export default App;
