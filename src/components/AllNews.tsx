import { useNews } from "@/hooks/use-news";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

export function AllNews() {
  const { news, loading, error } = useNews();

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Erro ao carregar notícias</CardTitle>
          <CardDescription>
            Não foi possível carregar as notícias. Por favor, tente novamente
            mais tarde.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!news.length) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Nenhuma notícia encontrada</CardTitle>
          <CardDescription>
            Não há notícias disponíveis no momento.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {news.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>
              {format(new Date(item.created_at), "d 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </CardDescription>
          </CardHeader>
          {item.image_url && (
            <div className="relative aspect-video">
              <img
                src={item.image_url}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <CardContent>
            <p className="text-sm text-muted-foreground">{item.content}</p>
          </CardContent>
          {item.external_link && (
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => window.open(item.external_link, "_blank")}
              >
                Leia mais
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
