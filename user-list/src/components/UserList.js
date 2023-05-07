import { Divider, List, ListItem, ListItemText } from '@mui/material';

const UserList = ({ users }) => {

    return (
        <List>
            {users.map((user, index) => (
                <div key={user.id}>
                    <ListItem key={user.id}>
                        <ListItemText primary={user.name} secondary={`${user.email} | ${user.phone}`} />
                    </ListItem>
                    {users.length > index + 1 && <Divider />}
                </div>
            ))}
        </List>
    );
}
export default UserList;