import ExpensesItemSkeleton from "./ExpensesItemSkeleton";

export default function ExpensesSkeleton() {
  return (
    <div className="row">
      <div className="col-12">
        <ul className="list-group list-group-flush">
          <ExpensesItemSkeleton />
          <ExpensesItemSkeleton />
          <ExpensesItemSkeleton />
        </ul>
      </div>
    </div>
  );
}
