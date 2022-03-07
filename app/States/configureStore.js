import { createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import inscriptionReducers from './reducers/inscription_reducers';
import connexionReducers from './reducers/connexion_reducers';
import usersReducers from './reducers/users_reducers';
import prestatairesReducers from './reducers/prestataire_reducers';
import countryReducers from './reducers/country_reducer';
import profilReducers from './reducers/profil_reducer';
import toggleFavorite from './reducers/toggleFavorite';
import themeReducers from './reducers/theme_reducers';
import CurrentDownload from './reducers/Download_reducers'
import PlayerSong from './reducers/player_reducer'
import { persistCombineReducers } from 'redux-persist';


const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

export default createStore(
    persistCombineReducers(
        rootPersistConfig, { inscriptionReducers, connexionReducers, toggleFavorite, usersReducers, prestatairesReducers, profilReducers, countryReducers, themeReducers, CurrentDownload, PlayerSong },
        applyMiddleware(),
    ),
);