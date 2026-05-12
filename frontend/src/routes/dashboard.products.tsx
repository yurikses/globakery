import { AppHeader } from '#/components/header'
import { PageTitle } from '#/components/page-title'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { ModalWindow } from '#/components/ui/modal'
import { SelectMenu } from '#/components/ui/select'
import { Table } from '#/components/ui/table'
import type { TableHeader } from '#/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/products')({
  component: RouteComponent,
})

const productHeaders: TableHeader[] = [
  { name: 'Название', type: 'text', accessorKey: 'name' },
  { name: 'Себестоимость', type: 'text', accessorKey: 'selfprice' },
  { name: 'Продажная стоимость', type: 'text', accessorKey: 'price' },
  { name: 'Рецептура', type: 'text', accessorKey: 'recipe' },
]

const ingredients = [{ value: 'sugar', text: 'Сахар' }]

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
            buttonText="+ Добавить изделие"
            className="mr-auto"
          >
            <form className="flex flex-col gap-2 mt-4">
              <Input placeholder="Хлеб белый" label="Название" />
              <RecipeList />
              <div className="flex gap-2 mt-4 ml-auto">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setShowNewProduct(false)}
                >
                  Отмена
                </Button>
                <Button variant="primary" type="submit">
                  Добавить
                </Button>
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

function RecipeList() {
  const [ingredients, setIngredients] = useState<
    { id: string; name: string | null; value: number | null }[]
  >([])

  function addIngredient() {
    setIngredients((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: null, value: null },
    ])
  }

  function deleteIngredient(id: string) {
    setIngredients((prev) => prev.filter((a) => a.id != id))
  }

  return (
    <div>
      <h2 className="text-text-2 uppercase font-semibold tracking-wider text-xs mb-1">
        Список ингредиентов
      </h2>
      <div className="flex flex-col gap-3">
        {ingredients.map((ingredient) => (
          <RecipeItem
            key={ingredient.id}
            recipe={ingredient}
            onDelete={() => deleteIngredient(ingredient.id)}
          />
        ))}
        <Button
          variant="secondary"
          size="default"
          type="button"
          onClick={() => addIngredient()}
        >
          Добавить ингредиент
        </Button>
      </div>
    </div>
  )
}

interface RecipeItemProps {
  recipe: { name: string | null; value: number | null }
  onDelete: () => void
}

function RecipeItem(props: RecipeItemProps) {
  return (
    <div className="flex gap-3 items-center">
      <SelectMenu
        options={ingredients}
        selectedValue={props.recipe.name ?? undefined}
        placeholder="Ингредиент"
        size="sm"
      />
      <Input
        type="number"
        defaultValue={props.recipe.value ?? undefined}
        containerClassName="flex-1"
      />
      <Button
        type="button"
        variant="danger"
        size="icon"
        className="size-6"
        onClick={props.onDelete}
      >
        <X />
      </Button>
    </div>
  )
}
