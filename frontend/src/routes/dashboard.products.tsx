import { AppHeader } from '#/components/header'
import { PageTitle } from '#/components/page-title';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { ModalWindow } from '#/components/ui/modal';
import { Table  } from '#/components/ui/table'
import type {TableHeader} from '#/components/ui/table';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/dashboard/products')({
  component: RouteComponent,
})

const productHeaders: TableHeader[] = [
  { name: 'Название', type: 'text', accessorKey: 'name' },
  { name: 'Себестоимость', type: 'text', accessorKey: 'selfprice' },
  { name: 'Продажная стоимость', type: 'text', accessorKey: 'price' },
  { name: 'Рецептура', type: 'text', accessorKey: 'recipe' },
]

function RouteComponent() {

  const [showNewProduct, setShowNewProduct] = useState(false)
  
  return (
    <div className="flex flex-col ">
      <AppHeader />
      
      <div className="flex flex-col gap-2 p-4">
        <PageTitle
          title="Изделия"
          details="Список всех изделий завода и их рецептур"
        />
        <div className="flex items-center gap-2 w-full justify-end">
          <ModalWindow
            open={showNewProduct}
            onOpenChange={setShowNewProduct}
            title="Добавление изделия"
            description="Введите данные нового изделия"
            buttonText='+ Добавить изделие'
            className='mr-auto'
          >
            <form className='flex flex-col gap-2 mt-4'>
              <Input placeholder='Хлеб белый' label='Название' />
              
              <div className='flex gap-2 mt-4 ml-auto'>
                <Button variant='secondary' type='button' onClick={()=>setShowNewProduct(false)}>Отмена</Button>
                <Button variant='primary' type='submit'>Добавить</Button>
              </div>
              
            </form>
          </ModalWindow>
          <Input className="w-120" placeholder="Поиск изделия" />
          <Button variant="primary">Найти</Button>
        </div>
        <div>
          <Table headers={productHeaders} />
        </div>
      </div>
    </div>
  )
}
