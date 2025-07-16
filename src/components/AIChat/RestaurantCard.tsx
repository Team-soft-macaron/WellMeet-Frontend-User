import React from 'react';

interface RestaurantCardProps {
    name: string;
    category: string;
    location: string;
    rating: number;
    vibe?: string;
    icon?: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
    name, category, location, rating, vibe, icon
}) => (
    <div style={styles.card}>
        <div style={styles.icon}>{icon || '🍽️'}</div>
        <div style={styles.info}>
            <div style={styles.name}>{name}</div>
            <div style={styles.details}>
                {category} · {location} · <span style={styles.rating}>⭐ {rating}</span>
                {vibe && <span style={styles.vibe}> · {vibe}</span>}
            </div>
        </div>
    </div>
);

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        border: '1px solid #eee',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    },
    icon: {
        fontSize: 32,
        marginRight: 16,
        width: 40,
        textAlign: 'center',
    },
    info: {
        flex: 1,
        minWidth: 0,
    },
    name: {
        fontWeight: 600,
        fontSize: 18,
        marginBottom: 4,
        color: '#222',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
    },
    details: {
        color: '#666',
        fontSize: 14,
        margin: '4px 0',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 4,
    },
    rating: {
        color: '#f5b342',
        fontWeight: 500,
        marginLeft: 4,
    },
    vibe: {
        marginLeft: 4,
        color: '#d26ac2',
        fontWeight: 500,
        fontSize: 14,
    },
}; 
