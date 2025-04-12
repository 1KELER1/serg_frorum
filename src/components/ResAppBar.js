import React, {useState, useEffect,useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom"
import AuthContext from '../context/AuthContext'


const options = {
  1: "Цели и задачи ВКР",
  2: "План работы",
  3: "Теоретические результаты",
  4: "Практические результаты",
  5: "Технологии",
  6: "Литература",
  7: "Презентация",
  8: "Общие вопросы"
}

const ResAppBar = () => {
 

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let {user} = useContext(AuthContext)
  let {logoutUser} = useContext(AuthContext)
  

  // initalize thread and posts component state
  const [profile, setProfile] = useState()

  useEffect(()=> {
    const getProfile = async () => {
      if (user !== null) {
        let userID = user['user_id']
        const response = await fetch(`/api/profile/${userID}`)

        // parse the data in json
        let data = await response.json()

        setProfile(data)
      }
        
    }
    getProfile()
  }, [user])
  

  return (
    <AppBar position="fixed" style={{ background: '#6a5acd' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '12',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Форум ВКР
          </Typography>
       
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              size="large"
              color="inherit"
              aria-label="open drawer"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: 'block' ,
              }}
            >  
              <Link 
                style={{textDecoration:"none", color:'black', textTransform: 'capitalize'}} 
                to={`/`}>
                <MenuItem key='Home' onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Главная</Typography>
                </MenuItem>
              </Link>

              {Object.keys(options).map((key, index) => (
                [
                <Link style={{textDecoration:"none", color:'black', textTransform: 'capitalize'}} 
                to={`/topic/${key}`}>
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography  textAlign="center">{options[key]}</Typography>
                </MenuItem>
                </Link>
                ]
              ))}

            </Menu>
          </Box>
        

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 0.6,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '12',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Форум ВКР
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
          </Box>
       
          <Box sx={{ flexGrow: 0 }}>

            {user && (
               <div className='d-flex justify-content-end'>
                <Typography
            noWrap
            component="a"
            href={`/profile/${user.user_id}`}
            sx={{
              mr: 1,
              p: 2,
              display: 'flex' ,
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '12',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {user.username}
          </Typography>
          
               <Tooltip title="Открыть настройки">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Аватар" src={profile?.avatar} />
                </IconButton>
              </Tooltip>
              
              <Menu sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

              <MenuItem key='profile' component={Link} to={`/profile/${user['user_id']}`}>
                <Typography textAlign="center">Профиль</Typography>

              </MenuItem>
              <MenuItem key='bookmark' component={Link} to="/bookmark" >
                <Typography textAlign="center">Закладки</Typography>

              </MenuItem>
              <MenuItem key='logout' onClick={logoutUser}>
                <Typography textAlign="center">Выход</Typography>

              </MenuItem>
                </Menu>
                </div>
        
            )}
            {!user && ( 
              <div className='d-flex justify-content-end'>
                <Typography
            noWrap
            component="a"
            href="/signup"
            sx={{
              mr: 2,
              display:  'flex' ,
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '12',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Регистрация
          </Typography>
            
          <Typography
            noWrap
            component="a"
            href="/login"
            sx={{
              mr: 2,
              display: 'flex' ,
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '12',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Вход
          </Typography>

          
              </div>
              
            )}
            
          </Box>
        
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResAppBar;