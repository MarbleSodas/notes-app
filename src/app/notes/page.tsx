import Link from 'next/link'
import PocketBase from 'pocketbase';

async function getNotes(){
    const db = new PocketBase('http://127.0.0.1:8090');
    const data = await db.collection('Posts').getList(1, 30);
    // const data = await res.json();
    return data?.items as any[];
}

export default async function NotesPage(){
    const notes = await getNotes();

    return(
        <>
        <h1>Notes</h1>
        <div>
            {notes?.map((note) => {
                return <Note key={note.id} note={note.message} />
            })}
        </div>
        </>
    )
}

function Note({ note } : any) {
    const { id, title, message, created } = note || {};
    return (
        <Link href={`/notes/${id}`}>
            <div>
                <h2>{title}</h2>
                <h5>{message}</h5>
                <p>{created}</p>
            </div>
        </Link>
    )
}