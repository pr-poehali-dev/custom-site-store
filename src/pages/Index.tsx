import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showClientPortal, setShowClientPortal] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в течение 24 часов",
    });
  };

  if (showClientPortal) {
    return <ClientPortal onBack={() => setShowClientPortal(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            WebStudio
          </h1>
          <div className="flex gap-6 items-center">
            <a href="#services" className="hover:text-primary transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Услуги</a>
            <a href="#process" className="hover:text-primary transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Процесс</a>
            <a href="#reviews" className="hover:text-primary transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Отзывы</a>
            <a href="#contact" className="hover:text-primary transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Контакты</a>
            <Button variant="outline" onClick={() => setShowClientPortal(true)}>
              <Icon name="User" size={16} className="mr-2" />
              Личный кабинет
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 animate-fade-in">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 text-sm">
            <Icon name="Sparkles" size={16} className="mr-2" />
            Создаём сайты под ключ
          </Badge>
          <h2 className="text-6xl font-bold mb-6 gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Ваш сайт мечты<br />за 7 дней
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Профессиональная разработка сайтов от 1500₽. Современный дизайн, быстрая загрузка и личный кабинет для контроля проекта
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <Icon name="Rocket" size={20} className="mr-2" />
              Заказать сайт
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Icon name="Play" size={20} className="mr-2" />
              Посмотреть примеры
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 animate-slide-up">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Наши услуги
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Создаём сайты любой сложности с прозрачным ценообразованием
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "Layout",
                title: "Лендинг",
                price: "1 500₽",
                features: ["Одностраничный сайт", "Адаптивный дизайн", "Форма заявки", "SEO-оптимизация"]
              },
              {
                icon: "Store",
                title: "Интернет-магазин",
                price: "5 000₽",
                features: ["Каталог товаров", "Корзина и оплата", "Личный кабинет", "Админ-панель"],
                popular: true
              },
              {
                icon: "Layers",
                title: "Корпоративный сайт",
                price: "3 500₽",
                features: ["Многостраничная структура", "Блог и новости", "Портфолио", "Интеграции"]
              }
            ].map((service, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${service.popular ? 'border-primary border-2' : ''}`}
              >
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary">
                    Популярный
                  </Badge>
                )}
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-3xl font-bold text-primary mt-2">
                    {service.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={service.popular ? "default" : "outline"}>
                    Выбрать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Как мы работаем
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Прозрачный процесс разработки с контролем на каждом этапе
          </p>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: "MessageSquare", title: "1. Обсуждение", desc: "Выясняем ваши пожелания и цели" },
              { icon: "Palette", title: "2. Дизайн", desc: "Создаём уникальный макет" },
              { icon: "Code", title: "3. Разработка", desc: "Пишем чистый код" },
              { icon: "Rocket", title: "4. Запуск", desc: "Публикуем и поддерживаем" }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={step.icon} size={36} className="text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {step.title}
                </h4>
                <p className="text-muted-foreground text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Отзывы клиентов
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Более 100 довольных клиентов уже запустили свои проекты
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Анна Петрова", role: "Владелица магазина", text: "Отличная работа! Сайт получился именно таким, как я хотела. Заказы пошли уже в первую неделю", rating: 5 },
              { name: "Дмитрий Сидоров", role: "Фрилансер", text: "Быстро, качественно и по адекватной цене. Личный кабинет очень удобный, всегда видел статус работы", rating: 5 },
              { name: "Елена Иванова", role: "Стилист", text: "Спасибо за красивый лендинг! Клиенты в восторге от дизайна, записи увеличились в 3 раза", rating: 5 }
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {review.name[0]}
                    </div>
                    <div>
                      <CardTitle className="text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {review.name}
                      </CardTitle>
                      <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                        {review.role}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent style={{ fontFamily: 'Inter, sans-serif' }}>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-2xl">
          <h3 className="text-4xl font-bold text-center mb-4 gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Начните свой проект
          </h3>
          <p className="text-center text-muted-foreground mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>
            Заполните форму, и мы свяжемся с вами в течение 24 часов
          </p>

          <Card className="shadow-2xl">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Ваше имя
                  </label>
                  <Input placeholder="Иван Иванов" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Email
                  </label>
                  <Input type="email" placeholder="ivan@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Телефон
                  </label>
                  <Input type="tel" placeholder="+7 (999) 123-45-67" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Расскажите о проекте
                  </label>
                  <Textarea 
                    placeholder="Опишите, какой сайт вам нужен..." 
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full text-lg py-6">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 bg-slate-900 text-white">
        <div className="container mx-auto text-center">
          <h4 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            WebStudio
          </h4>
          <p className="text-slate-400 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Создаём сайты, которые работают на вас
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <Icon name="Mail" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <Icon name="MessageCircle" size={20} />
            </Button>
          </div>
          <p className="text-slate-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2024 WebStudio. Все права защищены
          </p>
        </div>
      </footer>
    </div>
  );
};

const ClientPortal = ({ onBack }: { onBack: () => void }) => {
  const [projectId, setProjectId] = useState("");
  const [showProject, setShowProject] = useState(false);

  const projectData = {
    name: "Интернет-магазин цветов",
    status: "В разработке",
    progress: 65,
    stage: "Разработка функционала",
    stages: [
      { name: "Согласование ТЗ", status: "completed", date: "15.11.2024" },
      { name: "Создание дизайна", status: "completed", date: "20.11.2024" },
      { name: "Разработка функционала", status: "in-progress", date: "В процессе" },
      { name: "Тестирование", status: "pending", date: "Ожидание" },
      { name: "Запуск", status: "pending", date: "Ожидание" }
    ],
    nextDeadline: "05.12.2024",
    manager: "Алексей Смирнов"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Вернуться на главную
        </Button>

        {!showProject ? (
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Личный кабинет клиента
              </CardTitle>
              <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                Введите номер вашего проекта для отслеживания статуса
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Номер проекта
                  </label>
                  <Input 
                    placeholder="Например: WS-2024-001"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => setShowProject(true)}
                  disabled={!projectId}
                >
                  <Icon name="Search" size={20} className="mr-2" />
                  Найти проект
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <Card className="shadow-2xl">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {projectData.name}
                    </CardTitle>
                    <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                      Проект #{projectId}
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    {projectData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span className="text-sm font-medium">Общий прогресс</span>
                    <span className="text-sm font-bold text-primary">{projectData.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${projectData.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Calendar" size={20} className="text-primary" />
                      <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Следующий дедлайн
                      </span>
                    </div>
                    <p className="text-lg font-bold">{projectData.nextDeadline}</p>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="User" size={20} className="text-secondary" />
                      <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Ваш менеджер
                      </span>
                    </div>
                    <p className="text-lg font-bold">{projectData.manager}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Этапы разработки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectData.stages.map((stage, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        stage.status === 'completed' ? 'bg-green-500' :
                        stage.status === 'in-progress' ? 'bg-gradient-to-r from-primary to-secondary' :
                        'bg-slate-300'
                      }`}>
                        {stage.status === 'completed' ? (
                          <Icon name="Check" size={20} className="text-white" />
                        ) : stage.status === 'in-progress' ? (
                          <Icon name="Clock" size={20} className="text-white" />
                        ) : (
                          <Icon name="Circle" size={20} className="text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {stage.name}
                        </h4>
                        <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {stage.date}
                        </p>
                      </div>
                      <Badge variant={
                        stage.status === 'completed' ? 'default' :
                        stage.status === 'in-progress' ? 'secondary' :
                        'outline'
                      }>
                        {stage.status === 'completed' ? 'Завершено' :
                         stage.status === 'in-progress' ? 'В работе' :
                         'Ожидание'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Связаться с менеджером
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button className="flex-1">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Написать в чат
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Icon name="Phone" size={20} className="mr-2" />
                    Позвонить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
