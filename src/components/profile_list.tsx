interface ProfileProps {
  name: string;
  label: string;
  items: string[];
  addItem: (type: string, item: string) => void;
}

export default function ProfileList(props: ProfileProps) {
  const itemList = props.items.map((item: string, index: number) => (
    <li key={index}>{item}</li>
  ));

  function addNewItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newItem = formData.get(props.name) as string;

    if (newItem) {
      props.addItem(props.name, newItem);
    }
  }

  return (
    <>
      <section>
        <form onSubmit={addNewItem}>
          <label htmlFor={props.name}>
            {props.label}
            <input type="text" name={props.name} />
          </label>
          <button>Add</button>
        </form>
        {itemList.length > 0 && (
          <>
            <h2>{props.label}</h2>
            <ul aria-live="polite">{itemList}</ul>
          </>
        )}
      </section>
    </>
  );
}
