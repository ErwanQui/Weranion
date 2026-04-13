import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { axiosInstance } from '../../../utils/api';
import Ably from 'ably';
import './SheetsList.scss';

function SheetsList( props : {
  updateSheetDate: any
}): JSX.Element {
  const { updateSheetDate } = props;
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);
  const [sheetsList, updateSheetsList] = useState<any[]>([]);

  useEffect(() => {
    axiosInstance.get('treasury/sheetsList', {
      withCredentials: true
    })
      .then(response => {
        console.log('treasurySheet', response.data);
        updateSheetsList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
            
    // Initialisation d'Ably avec vos clés d'API (côté client)
    const apiKey = process.env.REACT_APP_ABLY_API_KEY;
    const client = new Ably.Realtime({ key: apiKey });
    setAblyClient(client);

    // Récupérer le canal de chat
    const channel = client.channels.get('treasury');

    // Écouter les messages entrants
    channel.subscribe('newTreasurySheet', () => {
      axiosInstance.get('treasury/sheetsList', {
        withCredentials: true
      })
        .then(response => {
          console.log('treasurySheet', response.data);
          updateSheetsList(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    });

    return () => {
      // Fermer la connexion Ably lorsqu'on quitte le composant
      client.close();
    };
  }, []);

  function updateTreasurySheet(year: number, month: number) {
    updateSheetDate({ usedYear: year, usedMonth: month});
  }

  return (
    <div className='sheetsListComponent'>
      {sheetsList.map((sheet, index) => (
        <Button
          className='sheetButton'
          variant="contained"
          key={index}
          fullWidth
          onClick={() => updateTreasurySheet(sheet.year, sheet.month)}
        >
          <div key={index}>
              Compte du {sheet.month}/{sheet.year}
          </div>
        </Button>
      ))}
    </div>
  );
}

export default SheetsList;