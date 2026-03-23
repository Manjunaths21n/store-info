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