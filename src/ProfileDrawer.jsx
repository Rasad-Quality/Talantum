import React, { useContext, useState, useEffect } from 'react';
import './ProfileDrawer.css'
import { SwipeableDrawer, Box, Typography, IconButton, Divider, Avatar, Button, Chip } from '@mui/material';
import { Close as CloseIcon, Logout as LogoutIcon, Save as SaveIcon } from '@mui/icons-material';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MAX_DESC_LENGTH = 500;

function ProfileDrawer({ open, onClose, onOpen }) {
    const { user, logout, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [charCount, setCharCount] = useState(0);
    const [username, setUsername] = useState('');
    
    const programmingLanguages = [
        'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP',
        'TypeScript', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
        'C', 'Scala', 'R', 'MATLAB', 'Perl', 'Dart',
        'Lua', 'Haskell', 'Clojure', 'F#', 'Elixir', 'Julia'
    ];

    useEffect(() => {
        if (user) {
            setDescription(user.description || '');
            setSelectedSkills(user.skills || []);
            setCharCount((user.description || '').length);
            setUsername(user.username || '');
        } else {
            setDescription('');
            setSelectedSkills([]);
            setCharCount(0);
            setUsername('');
        }
    }, [user, open]);

    const handleLogout = () => {
        if (onClose) {
            onClose();
        }
        logout();
        toast.success("You have been logged out.");
        navigate('/');
    };

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        if (newDescription.length <= MAX_DESC_LENGTH) {
            setDescription(newDescription);
            setCharCount(newDescription.length);
        }
    };

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const removeSkill = (skillToRemove) => {
        setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
    };

    const clearAllSkills = () => {
        setSelectedSkills([]);
    };

    const handleSaveProfile = () => {
        try {
            // Validate username
            if (username.trim() === '') {
                toast.error('Please enter a username');
                return;
            }

            const updatedUserData = {
                username: username.trim(),
                description: description,
                skills: selectedSkills
            };
            
            updateUser(updatedUserData);
            
            const userKey = `user_profile_${user.uid}`;
            localStorage.setItem(userKey, JSON.stringify(updatedUserData));
            
            console.log('Saving profile:', { username: username.trim(), description, skills: selectedSkills });
            toast.success('Profile updated successfully!');
            
            if (onClose) {
                onClose();
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error('Failed to save profile. Please try again.');
        }
    };

    const getInitials = (name) => {
        if (!name) return '';
        const nameParts = name.split(' ').filter(Boolean);
        if (nameParts.length > 1) {
            return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Get display name for avatar - prioritize username, fallback to user name
    const getDisplayName = () => {
        return username.trim() || user.name;
    };

    if (!user) {
        return null;
    }

    return (
        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={onClose}
            onOpen={onOpen}
        >
            <Box
                sx={{ 
                    width: 500, 
                    padding: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%',
                    overflow: 'auto'
                }}
                role="presentation"
                className="profile-drawer"
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Profile</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon sx={{color: '#fff'}}/>
                    </IconButton>
                </Box>
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ textAlign: 'center', my: 2 }}>
                    <Avatar sx={{ width: 80, height: 80, margin: '0 auto', mb: 1, bgcolor: '#0BA40F' }}>
                        {getInitials(getDisplayName())[0]}
                    </Avatar>
                    
                    {username.trim() && (
                        <Typography variant="h6" sx={{ color: '#0BA40F', fontWeight: 600, mb: 1 }}>
                            @{username.trim()}
                        </Typography>
                    )}
                    <Typography color="text.secondary" sx={{ mb: 2 , color:'#fff'}}>{user.email}</Typography>
                </Box>

                {/* Username Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                        👤 Username
                    </Typography>
                    <Box sx={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Enter your username..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '94%',
                                padding: '8px 12px',
                                border: '2px solid #0BA40F',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                                color: '#fff',
                                transition: 'border-color 0.2s',
                                backgroundColor: 'hsl(0, 0%, 7%)',
                                height: '40px'
                            }}
                        />
                        <Typography variant="caption" sx={{ color: '#a0aec0', mt: 1, display: 'block' }}>
                            Choose a unique username that represents you
                        </Typography>
                    </Box>
                </Box>

                {/* Description Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                        📝 About Me
                    </Typography>
                    <Box className="descriptioncontainer">
                        <textarea 
                            name="textarea" 
                            id="textarea" 
                            className='textarea1' 
                            placeholder='Tell people a bit about yourself... What are your interests, goals, or what makes you unique?'
                            value={description}
                            onChange={handleDescriptionChange}
                            maxLength={MAX_DESC_LENGTH}
                        />
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mt: 1,
                            fontSize: '12px',
                            color: '#718096'
                        }}>
                            <Typography variant="caption" sx={{ color: '#a0aec0' }}>
                                Share your story, interests, or what makes you unique
                            </Typography>
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    fontWeight: 500,
                                    color: charCount > MAX_DESC_LENGTH * 0.9 ? '#f56565' : '#718096'
                                }}
                            >
                                {charCount}/{MAX_DESC_LENGTH}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        💻 Programming Skills
                    </Typography>
                    
                    <Box className="skills-container">
                        <Box className="skills-grid">
                            {programmingLanguages.map((skill) => (
                                <Button
                                    key={skill}
                                    variant={selectedSkills.includes(skill) ? "contained" : "outlined"}
                                    size="small"
                                    className={`skill-btn ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                                    onClick={() => toggleSkill(skill)}
                                    sx={{
                                        minHeight: '40px',
                                        fontSize: '12px',
                                        textTransform: 'none',
                                        borderRadius: '10px',
                                        backgroundColor: selectedSkills.includes(skill) ? '#0BA40F' : 'hsl(0, 0%, 7%)',
                                        borderColor: selectedSkills.includes(skill) ? '#0BA40F' : 'hsl(124, 60%, 40%)',
                                        color: selectedSkills.includes(skill) ? 'white' : '#4a5568',
                                        '&:hover': {
                                            backgroundColor: selectedSkills.includes(skill) ? '#0A8F0D' : 'hsl(0, 0%, 15%)',
                                            borderColor: '#0BA40F',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(11, 164, 15, 0.15)',
                                            color: 'white'
                                        }
                                    }}
                                >
                                    {skill}
                                </Button>
                            ))}
                        </Box>

                        {selectedSkills.length > 0 && (
                            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e2e8f0' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        Selected Skills
                                    </Typography>
                                    <Button 
                                        size="small" 
                                        color="error" 
                                        variant="text"
                                        onClick={clearAllSkills}
                                        sx={{ fontSize: '11px' }}
                                    >
                                        Clear All
                                    </Button>
                                </Box>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {selectedSkills.map((skill) => (
                                        <Chip
                                            key={skill}
                                            label={skill}
                                            onDelete={() => removeSkill(skill)}
                                            size="small"
                                            sx={{
                                                backgroundColor: '#0BA40F',
                                                color: 'white',
                                                '& .MuiChip-deleteIcon': {
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    '&:hover': {
                                                        color: 'white'
                                                    }
                                                }
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>

                <Box sx={{ mt: 'auto', pt: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveProfile}
                        fullWidth
                        sx={{ 
                            mb: 2,
                            backgroundColor: '#0BA40F',
                            '&:hover': {
                                backgroundColor: '#0A8F0D'
                            }
                        }}
                    >
                        Save Changes
                    </Button>
                    
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        fullWidth
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </SwipeableDrawer>
    );
}

export default ProfileDrawer;
