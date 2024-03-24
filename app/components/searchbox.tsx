import "./searchbox.css";

export default function SearchBOX({ fetcher }: any) {
  return (
    <div className="form__group field">
      <input
        type="input"
        className="form__field"
        placeholder="Search..."
        name="sq"
        onChange={(x) => fetcher.submit(x.currentTarget.form)}
        required
      />
      <label htmlFor="sq" className="form__label">
        Search For Posts
      </label>
    </div>
  );
}
