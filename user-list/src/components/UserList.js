import { Divider, Button, List, ListItem, ListItemText } from '@mui/material'
import { Smartphone, Email } from '@mui/icons-material';
import { Fragment } from 'react';

const UserList = ({ users, onToggleSnack }) => {

    const copyToClipboard = (value, message) => {
        navigator.clipboard.writeText(value)
            .then(() => onToggleSnack(`Copied ${message} to clipboard!`, 'success'),
                () => onToggleSnack(`Failed to copy ${message} to clipboard.`, 'error')
            );
    }

    return (
        <List>
            {users.map((user, index) => (
                <div key={user.id}>
                    <ListItem key={user.id}>
                        <ListItemText primary={user.name} secondary={
                            <Fragment>
                                <Button size="small" margin="normal" onClick={() => copyToClipboard(user.phone, `${user.name}'s phone numer`)}>
                                    <Smartphone />&thinsp;{user.phone}
                                </Button>
                                <Button size="small" margin="normal" onClick={() => copyToClipboard(user.email, `${user.name}'s email`)}>
                                    <Email />&thinsp;{user.email}
                                </Button>
                            </Fragment>
                        } />
                    </ListItem>
                    {users.length > index + 1 && <Divider />}
                </div>
            ))}
        </List>
    )
}
export default UserList