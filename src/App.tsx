
import './App.css';
import ListaDeTareas from './components/ListaDeTareas';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from './i18n';

function App() {

  const {t, i18n} = useTranslation();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };


  return (
    <div className='aplicacion-tareas'>
      <div className='languaje-selector'>
        <select
          id='languaje-select'
          onChange={changeLanguage}
          value={i18n.language.substring(0,2)}
          aria-label='a'>
            {AVAILABLE_LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>

        
      </div>
      <div className='titulo-contenedor'>
        <h1>{t('app.title')}</h1>
      </div>
      <div className='tareas-lista-principal'>
        <ListaDeTareas />
      </div>
    </div>
  );
}

export default App;