import { Label } from "./Filter.styled";

const Filter = ({ value, onChange }) => (
  <Label htmlFor="">Find contacts by name
    <input type="text" name="filter" value={value} onChange={(e)=> onChange(e.currentTarget.value)}/>
</Label>
)

export default Filter;