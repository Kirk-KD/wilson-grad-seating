import InfoIcon from '@mui/icons-material/Info';
import { Box, Switch, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { setAllowBook, setDeadline } from '../../../utils/firebase/seating.js';
import { useSettingsContext } from '../../context/SettingsContext';
import StyledBox from '../StyledBox.jsx';

export function Settings() {
  const settings = useSettingsContext();

  const deadline = settings.deadline?.value;
  const allowBook = settings.allowBook?.value;

  const value = deadline ? dayjs(deadline.toDate()) : null;

  const StyledSwitchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  }));

  if (settings.deadline !== undefined && settings.allowBook !== undefined) return (
  <Box sx={{
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    gap: 2,
  }}>
    <StyledBox sx={{
      display: 'flex',
      flexDirection: 'row',
      minHeight: 'fit-content',
      maxWidth: '65%',
    }}>
      <Box sx={{
        color: (theme) => theme.palette.text.secondary,
        height: '100%'
      }}>
        <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
      </Box>
      
      <Box sx={{
        height: '100%'
      }}>
        <Typography
          component='p'
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Changes made to the settings here take effect immediately on all students. To individually toggle a student's ability to make reservations, go to the students tab.
        </Typography>
        <br />
        <Typography
          component='p'
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          If the current time is past "deadline", or "allow booking" is disabled, no student will be able to make changes to their seat selection.
        </Typography>
      </Box>
    </StyledBox>

    <Box p={0} m={0} sx={{
      gap: 1,
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }}>
      <StyledBox sx={{
        // flexGrow: 1.5
      }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            sx={{
              width: '100%'
            }}
            closeOnSelect="false"
            label="Deadline"
            value={value}
            onChange={async (newValue) => {
              try {
                if (!newValue || !newValue.isValid()) return;
                await setDeadline(Timestamp.fromDate(newValue.toDate()));
              } catch (err) {
                alert("Failed to update deadline:", err.message);
              }
            }}
            renderInput={(params) => <TextField {...params} />}
            slotProps={{
              field: {
                readOnly: true
              }
            }}
          />
        </LocalizationProvider>
      </StyledBox>

      <StyledBox sx={{
        // flexGrow: 0.5
      }}>
        <StyledSwitchContainer>
          <span>Allow booking?</span>
          <Switch
            checked={allowBook}
            onChange={async (event) => await setAllowBook(event.target.checked)}
          />
        </StyledSwitchContainer>
      </StyledBox>
    </Box>
  </Box>);
  else return null;
}