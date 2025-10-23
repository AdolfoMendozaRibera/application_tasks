import { useTranslation } from 'react-i18next';
import type { EstadisticasProps } from '../types';

function Estadisticas({ total, completadas, activas }: EstadisticasProps) {
  const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;

  const {t} = useTranslation();

  return (
    <div className='estadisticas-contenedor'>
      <div className='estadistica-card'>
        <div className='estadistica-icono'>📊</div>
        <div className='estadistica-info'>
          <span className='estadistica-numero'>{total}</span>
          <span className='estadistica-label'>{t('stats.total')}</span>
        </div>
      </div>

      <div className='estadistica-card'>
        <div className='estadistica-icono'>✅</div>
        <div className='estadistica-info'>
          <span className='estadistica-numero'>{completadas}</span>
          <span className='estadistica-label'>{t('stats.completed')}</span>
        </div>
      </div>

      <div className='estadistica-card'>
        <div className='estadistica-icono'>⏳</div>
        <div className='estadistica-info'>
          <span className='estadistica-numero'>{activas}</span>
          <span className='estadistica-label'>{t('stats.active')}</span>
        </div>
      </div>

      <div className='estadistica-card progreso'>
        <div className='estadistica-icono'>🎯</div>
        <div className='estadistica-info'>
          <span className='estadistica-numero'>{porcentaje}%</span>
          <span className='estadistica-label'>{t('stats.progress')}</span>
        </div>
        <div className='barra-progreso'>
          <div 
            className='barra-progreso-fill' 
            style={{ width: `${porcentaje}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Estadisticas;