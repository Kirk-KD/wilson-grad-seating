import { Box, Link, Switch, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Container, styled } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { setAllowBook, setDeadline } from '../../../utils/firebase/seating.js';
import { useSettingsContext } from '../../context/SettingsContext';

export function Settings() {
  const settings = useSettingsContext();

  const deadline = settings.deadline?.value;
  const allowBook = settings.allowBook?.value;

  const value = deadline ? dayjs(deadline.toDate()) : null;

  const StyledSettingsContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }));

  const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: "90%",
    justifyContent: "center",
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '40%'
    },
  }));

  const StyledSwitchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: "100%",
      justifyContent: 'space-between',
    },
  }));

  if (settings.deadline !== undefined && settings.allowBook !== undefined) return (
    <StyledSettingsContainer>
      <StyledBox>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Deadline"
            value={value}
            onChange={async (newValue) => {
              try {
                if (!newValue || !newValue.isValid()) return;
                await setDeadline(Timestamp.fromDate(newValue.toDate()));
              } catch (err) {
                alert("Failed to update deadline:", err);
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <StyledSwitchContainer>
          <span>Allow booking?</span>
          <Switch
            checked={allowBook}
            onChange={async (event) => await setAllowBook(event.target.checked)}
          />
        </StyledSwitchContainer>
      </StyledBox>
      <Typography variant='subtitle1' color='textSecondary' align='center' sx={{
        maxWidth: {
          sm: '90%',
          md: '50%'
        }
      }}>
        Settings here take effect immedietly on all students. To toggle a single student's ability to choose their seat, <Link href='/admin/students'>go to students management</Link>.
      </Typography>
    </StyledSettingsContainer>
  );
  else return null;
}