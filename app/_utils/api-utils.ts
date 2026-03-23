export async function fetchAppStoreConfig() {
    const res = await fetch('/api/store');
    return res.json();
}

export async function fetchDBStoreConfig() {
    const res = await fetch('/api/store');
    if (!res.ok) {
        const errorText = await res.text(); // ← get actual error message
        console.error('API Error:', errorText);
        throw new Error(`Failed to fetch store config: ${errorText}`);
    }
    return res.json();
}

export async function updateStoreStatus(status: boolean) {
    const res = await fetch('/api/store', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update store status');
    return res.json();
}
