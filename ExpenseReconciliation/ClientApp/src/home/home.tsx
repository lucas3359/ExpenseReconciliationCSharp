import UploadFile from './uploadFile';
import Card from './Card';
import Icon from '../components/Icon';

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols:3 px-5 md:gap-3 gap-y-7">
      <Card link="/dashboard">
        <Icon icon="pie-chart" classes="w-20 mx-auto" />
        <p className="text-center font-semibold">Dashboard</p>
      </Card>

      <UploadFile />

      <Card link="/list">
        <Icon icon="clipboard" classes="w-20 mx-auto" />
        <p className="text-center font-semibold">Reconcile transactions</p>
      </Card>

      <Card link="/categories">
        <Icon icon="sort-asc" classes="w-20 mx-auto" />
        <p className="text-center font-semibold">Categories</p>
      </Card>
    </div>
  );
}
