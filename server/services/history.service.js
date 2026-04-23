async function updateHistory(id, value) {
  return History.findOneAndUpdate(
    {_id: id.toString()},
    { $set: { value: value } },
    { new: true }
  )
}