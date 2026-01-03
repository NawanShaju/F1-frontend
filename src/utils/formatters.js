export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export const formatGapToLeader = (gap_to_leader, duration) => {
    if (!gap_to_leader) return 'N/A';

    if (gap_to_leader == 0) {
        return formatDuration(duration);
    }

    return "+" + gap_to_leader + "s";
};

export const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const padded = (num) => String(num).padStart(2, '0');

    return `${padded(hrs)}:${padded(mins)}:${padded(secs)}`;
}