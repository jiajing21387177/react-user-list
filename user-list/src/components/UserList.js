import { Divider, Button, List, ListItem, ListItemText } from '@mui/material'
import { Smartphone, Email } from '@mui/icons-material';
import { Fragment } from 'react';

const UserList = ({ users }) => {

    return (
        <List>
            {users.map((user, index) => (
                <div key={user.id}>
                    <ListItem key={user.id}>
                        <ListItemText primary={user.name} secondary={
                            <Fragment>
                                <Button size="small" margin="normal">
                                    <Smartphone />&thinsp;{user.phone}
                                </Button>
                                <Button size="small" margin="normal">
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